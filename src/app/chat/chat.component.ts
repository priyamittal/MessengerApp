import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

interface Chat {
  id: number,
  name: string,
  messages: Message[]
}
interface Message {
  id: number,
  myMessage: boolean,
  message: string
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  chats: Chat[] = [];
  newChat: Chat | undefined;
 // contactList: string[] = ['test1', 'test2', 'test3', 'test4']
  newChatAddForm: FormGroup;
  submitted: boolean = false;
  inputMessage: string;
  selectedOptions: Chat[] = [];

  constructor(private fb: FormBuilder) {
    this.chats = [
      {id:12,name:'priya', messages:[
        {id:1, myMessage:false, message:'Hi'},
        {id:1, myMessage:true, message:'Hello'}]
    }];

    this.newChatAddForm = this.fb.group({
      name: ['', [
        Validators.required],
      ]
    });
    this.inputMessage = '';
  }

  onSubmit(value: any) {
    this.submitted = true;
    if (!this.newChatAddForm.controls['name'].valid) {
      return;
    }
    this.openChat();
  }

  openChat() {
    if(this.chats.length > 0) {
      for (let a in this.chats) {
        if (this.chats[a].name == this.newChatAddForm.controls['name'].value) {
          this.selectedOptions = [];
          this.selectedOptions.push(this.chats[a]);
          return;
        }
      }
      this.newChat = {id:  Math.random(), name: this.newChatAddForm.controls['name'].value, messages:[]}
      this.chats?.unshift(this.newChat);
      this.newChatAddForm.controls['name'].setValue('');
      this.selectedOptions = [];
      this.selectedOptions.push(this.newChat);
      this.submitted = false;
    }
  }

  sendMsssage(id: any, message: string) {
    this.chats = this.chats.map((chat) => {
      if(chat.id == id) {
        chat.messages.push({id:Math.random(), myMessage: true, message: message})
      }
      return chat;
    })
    this.inputMessage='';
  }

  onNgModelChange($event: any) {

  }
}
