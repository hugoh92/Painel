import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';
export const routeTransitionAnimations = trigger('triggerName', [
    transition('buscador <=> *', [
        query(':enter, :leave',
            style({ position: 'fixed', width: '100%' }),
            { optional: true }),
        /*group([
            query(':enter', [
                style({ transform: 'translateY(100%)' }),
                animate('0.5s ease-in-out',
                    style({ transform: 'translateY(0%)' }))
            ], { optional: true }),
            query(':leave', [
                style({ transform: 'translateY(0%)' }),
                animate('0.5s ease-in-out',
                    style({ transform: 'translateY(-100%)' }))
            ], { optional: true }),
        ])*/
    ])
]);