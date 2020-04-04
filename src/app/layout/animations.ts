import { trigger, transition, style, animate, state } from '@angular/animations';


export const slideToRight =  trigger('routeAnimations', [
    state('void', style({})),
    state('*', style({})),
    transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate(
            '.5s ease-in-out',
            style({ transform: 'translateX(100%)' })
        )
    ])
]);

export const slideToLeft =  trigger('routeAnimations', [
    state('void', style({})),
    state('*', style({})),
    transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate(
            '.5s ease-in-out',
            style({ transform: 'translateX(-100%)' })
        )
    ])
]);

export const slideToBottom = trigger('routeAnimations', [
    state('void', style({})),
    state('*', style({})),
    transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate(
            '.5s ease-in-out',
            style({ transform: 'translateY(100%)' })
        )
    ])
]);

export const slideToTop = trigger('routeAnimations', [
    state('void', style({})),
    state('*', style({})),
    transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate(
            '.5s ease-in-out',
            style({ transform: 'translateY(-100%)' })
        )
    ])
]);

export const slideItem = trigger('listItemAnimation', [
    state('void', style({})),
    state('*', style({})),
    transition(':enter', [
        style({ transform: 'translateY(100%)' }),
        animate('.5s ease-in-out', style({ transform: 'translateY(0%)' }))
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0%)' }),
        animate(
            '.5s ease-in-out',
            style({ transform: 'translateY(-100%)' })
        )
    ])
]);
