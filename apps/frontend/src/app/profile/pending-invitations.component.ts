import { Component, input } from '@angular/core';

import { InvitationDto } from '../shared/models';

@Component({
    selector: 'app-pending-invitations',
    imports: [],
    template: `
    @if (this.invitations(); as invitations) {
      <div
        class="flex gap-2 mb-10 rounded-md p-4 border border-gray-300 flex-col max-w-3xl"
        >
        <h2>Currently pending invitations:</h2>
        <ul>
          @for (invitation of invitations; track invitation) {
            <li>
              {{ invitation.emailToInvite }}
            </li>
          }
        </ul>
      </div>
    }
    `,
    styles: ``
})
export class PendingInvitationsComponent {
  readonly invitations = input.required<InvitationDto[]>();
}
