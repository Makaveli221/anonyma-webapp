import { Component, OnInit } from '@angular/core';
import { slideToTop } from 'app/layout/animations';
import * as M from 'materialize-css';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubjectService } from '@service/forum/subject.service';
import { TeaserService } from '@service/forum/teaser.service';
import { Teaser } from '@schema/teaser';

@Component({
  selector: 'app-list-teasing',
  templateUrl: './list-teasing.component.html',
  styleUrls: ['./list-teasing.component.scss'],
  animations: [
    slideToTop
 ]
})
export class ListTeasingComponent implements OnInit {
  teasers: Teaser[];
  types: any[];
  teaser: Teaser;
  modal: any;
  headerModal: string;
  error: string;
  isLoading: boolean;
  submitted = false;
  teaserForm: FormGroup;
  uploadFile: File;
  elChips: any[];
  presentation: string;
  fileToShow: any;
  isFileLoading = true;

  constructor(private formBuilder: FormBuilder, private teaserService: TeaserService, private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.teasers = [];
    this.types = [];
    this.presentation = '';
    this.subjectService.getAllType().subscribe((res: any) => {
      this.types = res;
    });
    this.teaserService.all().subscribe((res: any) => {
      this.teasers = res as Teaser[];
      this.initModal();
    });
    this.buildForm(this.teaser);
  }

  initModal() {
    M.Modal.init(document.querySelectorAll('.modal'), {
      onOpenStart: (mod: HTMLElement, btn: HTMLElement) => {
        if (mod.id === 'modal2') {
          setTimeout(() => {
            this.presentation = btn.getAttribute('data-teaser-pres'); 
            this.getFile(this.presentation);
          });
          return;
        }
        this.headerModal = 'Ajout d\'une nouvelle teaser';
        if(btn.getAttribute('data-teaser')) {
          const foundIndex = this.teasers.findIndex(x => x.id === btn.getAttribute('data-teaser'));
          this.teaser = this.teasers[foundIndex];
          this.headerModal = 'Modification d\'une teaser';
        }
        this.buildForm(this.teaser);
      },
      onCloseStart: () => {
        this.teaser = null;
        this.presentation = '';
      }
    });
    this.modal = M.Modal.getInstance(document.querySelector('.modal'));
  }

  get f () {
    return this.teaserForm.controls;
  }

  private buildForm(tea?: Teaser): void {
    this.setDataShips();
    let objectForm = {
      typeSubject: [tea ? tea.typeSubject.id : '', Validators.required],
      title: [tea ? tea.title : '', Validators.required],
      description: [tea ? tea.description : '', Validators.required],
      keywords: ['', tea ? [] : [Validators.required]],
      presentation: ['']
    }
    this.teaserForm = this.formBuilder.group(objectForm);
    setTimeout(() => {
      M.textareaAutoResize(document.querySelector('#description'));
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    this.uploadFile = file;
  }

  setDataShips() {
    let dataChips = [];
    if (this.teaser && this.teaser.keywords) {
      this.teaser.keywords.forEach((d: string) => dataChips.push({tag: d}))
    }
    setTimeout(() => {
      M.FormSelect.init(document.querySelectorAll('select'),{});
      this.elChips = M.Chips.init(document.querySelectorAll('.chips'), {
        data: dataChips,
        placeholder: 'Ajouter mots clés',
        secondaryPlaceholder: '+ Ajouter',
        limit: 7
      });
    }, 0);
  }

  submitForm() {
    if(this.submitted) {
      return;
    }
    this.submitted = true;
    this.isLoading = true;
    const idTeaser = this.teaser ? this.teaser.id : null;

    this.teaser = this.teaserForm.value as Teaser;
    this.teaser.keywords = this.elChips[0].chipsData.reduce((accumulator, currentValue) => {
      accumulator.push(currentValue.tag);
      return accumulator;
    },[]);

    const formData = new FormData();
    if (this.uploadFile) {
      formData.append('uploadFile', this.uploadFile, this.uploadFile.name);
    }
    formData.append('info', JSON.stringify(this.teaser));

    if(idTeaser) {
      this.teaserService.update(idTeaser, formData).subscribe((response: any) => {
        this.validResponse(response, 'update');
      }, (error: any) => {
        this.validResponse(error, 'update');
      });
    } else {
      this.teaserService.create(formData).subscribe((response: any) => {
        this.validResponse(response, 'create');
      }, (error: any) => {
        this.teaser = null;
        this.validResponse(error, 'create');
      });
    }
  }

  validResponse(response: any, action: string) {
    if(response && response.id) {
      let message = 'Nouvele teaser ajoutée avec succès!';
      if (action === 'update') {
        const foundIndex = this.teasers.findIndex(x => x.id === response.id);
        this.teasers[foundIndex] = response;
        message = 'teaser modifié avec succès!';
      } else {
        this.teasers.unshift(response);
      }
      this.modal.close();
      var toastHTML = '<span>'+ message +'</span><button class="btn-flat toast-action" onclick="M.toast.dismiss();">Fermer</button>';
      M.toast({html: toastHTML});
    } else {
      this.error = 'La taille de la photo ou de la video que vous venez de charger est trop gros';
    }
    this.submitted = false;
    this.isLoading = false;
  }

  getKeywords(keywords: string) {
    return JSON.parse(keywords);
  }

  getTeaserType(filename: string) {
    const videos = ['mp4', 'mp3'];
    const images = ['jpg', 'jpeg', 'png', 'gif'];
    let type = '';
    const ext = (filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename).toLowerCase();
    if (videos.indexOf(ext) != -1) {
      type = 'video';
    }
    if (images.indexOf(ext) != -1) {
      type = 'image';
    }
    return type;
  }

  getFile(filename: string) {
    this.isFileLoading = true;
    this.fileToShow = "";
    this.teaserService.getFile(filename).subscribe((dataBlob: Blob) => {
      this.createImageFromBlob(dataBlob);
        this.isFileLoading = false;
      }, error => {
        this.isFileLoading = false;
        console.log(error);
      });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
       this.fileToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }
}
