export interface IChatWithModel {
  activeUser: string;
  otherUser: string;
} // when active user want to chatt with certain user / person;

export interface IChatWithMessagesModel {
  id: number;
  receiverId: number;
  senderId: number;
  message_sender: string;
  message_receiver: string;
  message: string;
} // a fields returned for chatts of between users;

export interface IChatSendMessageModel {
  receiverId: number;
  senderId: number;
  activeUser: string;
  otherUser: string;
  message: string;
} // when sending a message to other user

export interface IChatWithListModel {
  userId: number;
  senderId: number;
  receiverId: number;
  receiverMessageId: number;
  senderMessageId: number;
  message: string;
  date: string;
  receiverMessage: {
    id: number;
    email: string;
    userId: number;
  };
  senderMessage: {
    id: number;
    email: string;
    userId: number;
  };
}
// para rani sa listing of users na naka chatt niya
