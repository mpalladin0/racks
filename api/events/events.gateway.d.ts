import { WsResponse } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Observable } from 'rxjs';
export declare class EventsGateway {
    server: Server;
    sendMessageToBackend(data: any): Observable<WsResponse<any>>;
    tellBackendSomethin(data: any): Observable<WsResponse<any>>;
    identity(data: number): Promise<number>;
    onUser(data: any): Observable<WsResponse<any>>;
}
