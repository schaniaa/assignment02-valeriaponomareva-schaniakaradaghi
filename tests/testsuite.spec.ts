import { test, expect, APIResponse } from '@playwright/test';
import { APIHelper } from './apiHelpers';
import { generateClientData, generateReservationData, generateRoomsData } from './testData';


const BASE_URL = `${process.env.BASE_URL}`;

test.describe('Test Suite Hotel', () => {
    let apiHelper: APIHelper;
    
    test.beforeAll(async ({ request }) => {
        apiHelper = new APIHelper(BASE_URL);
        const login = await apiHelper.login(request);
        expect(login.ok()).toBeTruthy();
        expect(login.status()).toBe(200);
    });

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

test('Delete Room By ID', async ({ request }) => {
    const deleteRoomById = await apiHelper.deleteRoomById(request);
    expect(deleteRoomById.ok()).toBeTruthy();
    expect (deleteRoomById.status()).toBe(200);
});

test('Create Room', async ({ request }) => {
    const payload = generateRoomsData();
    const createRoom = await apiHelper.createRoom(request, payload);
    expect(createRoom.ok()).toBeTruthy();
        expect.objectContaining({
        number: payload.number,
        floor: payload.floor,
        price: payload.price,
        available: payload.available,
        features: expect.arrayContaining(payload.features),
        category: payload.category
});

});

test('Get all Clients', async ({ request }) => {
    const getAllClients = await apiHelper.getAllClients(request);
    expect(getAllClients.ok()).toBeTruthy();
    expect (getAllClients.status()).toBe(200);
  });

  test('Create Client', async ({ request }) => {
    const payload = generateClientData();
    const createClient = await apiHelper.createClient(request, payload);
    expect(createClient.ok()).toBeTruthy();
        expect.objectContaining({
        name: payload.name,
        email: payload.email,
        telephone: payload.telephone
});
});

test('Update client Information', async ({ request }) => {
    const payload = generateClientData(); 
    const updateClient = await apiHelper.updateClient(request, payload);
    expect(updateClient.ok()).toBeTruthy();
    expect (updateClient.status()).toBe(200);
    expect.objectContaining({
        name: payload.name,
        email: payload.email,
        telephone: payload.telephone
});

});

test('Get All Reservations', async ({ request }) => {
    const getAllReservation = await apiHelper.getAllReservation(request);
    expect(getAllReservation.ok()).toBeTruthy();
    expect (getAllReservation.status()).toBe(200);
  });

test('Create Reservation', async ({ request }) => {
    const payload = generateReservationData();
    const createReservation = await apiHelper.createReservation(request, payload);
    expect(createReservation.ok()).toBeTruthy();
     expect.objectContaining({
        start: payload.start,
        end: payload.end,
        client: payload.client,
        room: payload.room,
        bill: payload.bill
    });
});

test('Update reservation', async ({ request }) => {
    const payload = generateReservationData(); 
    const updateReservation = await apiHelper.updateReservation(request, payload);
    expect(updateReservation.ok()).toBeTruthy();
    expect (updateReservation.status()).toBe(200);
    expect.objectContaining({
        start: payload.start,
        end: payload.end,
        client: payload.client,
        room: payload.room,
        bill: payload.bill
});

});
});