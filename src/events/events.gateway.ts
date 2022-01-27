import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WsResponse } from '@nestjs/websockets';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { instrument } from '@socket.io/admin-ui';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway  {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('send message to backend')
  sendMessageToBackend(@MessageBody() data: any): Observable<WsResponse<any>> {
    console.log("Client sent a message:", data)

    return data
  }

  @SubscribeMessage('tell backend somethin sexy')
  tellBackendSomethin(@MessageBody() data: any): Observable<WsResponse<any>> {
    console.log("Client wants u: ", data)
    return data
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  onUser(@MessageBody() data: any): Observable<WsResponse<any>> {
    console.log("Client wants u: ", data)
    this.server.on('send message to backend', ({ data }) => {
      console.log("onUser", data)
    })
    return data
  }
}
