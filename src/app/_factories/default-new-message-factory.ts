import { NewMessageInput } from '../_interfaces/new-message-input';

export class DefaultNewMessageFactory implements NewMessageInput {
  content: '';
  recipientId: 0;
  constructor() {
    return {
      content: this.content,
      recipientId: this.recipientId
    };
  }
}
