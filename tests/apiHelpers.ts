import { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private baseUrl: string;
    private username: string;
    private token: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }


    async login(request: APIRequestContext) {
        const response = await request.post('http://localhost:3000/api/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                username: `${process.env.TEST_USERNAME}`,
                password: `${process.env.TEST_PASSWORD}`
            })
        });
        const responseData = await response.json();
        this.username = responseData.username;
        this.token = responseData.token;
        return response;
    }

    private getAuthHeaders() {
        return {
            'Content-Type': 'application/json',
            'x-user-auth': JSON.stringify({
                username: this.username,
                token: this.token
            })
        };
    }


    async getAllRooms(request: APIRequestContext) {
        return request.get(`${this.baseUrl}/rooms`, {
            headers: this.getAuthHeaders()
        });
    }

    async createRoom(request: APIRequestContext, payload: object) {
        const response = await request.post(`${this.baseUrl}/room/new`, 
            {
                headers: {
                'Content-Type': 'application/json',
                'x-user-auth': JSON.stringify({
                    username: this.username,
                    token: this.token
                })
            },
            data: JSON.stringify(payload) 
        });
        return response;
    }

    async updateRoom(request: APIRequestContext, payload: object) {
        const response = await request.put(`${this.baseUrl}/room/1`, {
            headers: {
                'Content-Type': 'application/json',
                'x-user-auth': JSON.stringify({
                    username: this.username,
                    token: this.token
                })
            },
            data: JSON.stringify(payload) 
        });
        return response;
    }
    
    async deleteRoomById(request: APIRequestContext) {
        const response = await request.delete(`${this.baseUrl}/room/2`, 
            {
            headers: {
                'Content-Type': 'application/json',
                'x-user-auth': JSON.stringify({
                    username: this.username,
                    token: this.token
                })
            }}
        );
        return response;
    }
}