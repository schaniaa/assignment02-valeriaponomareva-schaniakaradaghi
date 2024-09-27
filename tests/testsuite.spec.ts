import { test, expect, APIResponse } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { generateRoomsData } from './testData';
import { stringify } from 'querystring';


const BASE_URL = `${process.env.BASE_URL}`;

test.describe('Test Suite Hotel', () => {
    let apiHelper: APIHelper;
    
    // Logga in innan alla tester körs
    test.beforeAll(async ({ request }) => {
        apiHelper = new APIHelper(BASE_URL);
        const login = await apiHelper.login(request);
        expect(login.ok()).toBeTruthy();
        expect(login.status()).toBe(200);
    });

    // Test för att hämta alla rum
    test('Get all Rooms', async ({ request }) => {
        const getAllRooms = await apiHelper.getAllRooms(request);
        expect(getAllRooms.ok()).toBeTruthy();
        expect(getAllRooms.status()).toBe(200);
    });

    test('Update Room Information', async ({ request }) => {
        const payload = generateRoomsData();
        const updateRoom = await apiHelper.updateRoom(request, payload);
        expect(updateRoom.ok()).toBeTruthy();
        expect (updateRoom.status()).toBe(200);
        expect.objectContaining({
            number: payload.number,
            floor: payload.floor,
            price: payload.price,
            id: payload.id
    });
});

});