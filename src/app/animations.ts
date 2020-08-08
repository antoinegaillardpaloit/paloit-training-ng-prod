import { trigger, state, transition, style, animate } from '@angular/animations';

export let cardShuffle = trigger('cardShuffle', [

    // state('void', style({ opacity: 0 })),

    state('void', style({ transform: 'translateY(16px)' })),

    transition(':enter, :leave', [
        animate(250)
    ])
])