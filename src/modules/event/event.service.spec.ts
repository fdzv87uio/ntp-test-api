import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { getModelToken } from '@nestjs/mongoose';
import { Event } from './schemas/event.schema';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';


describe('Event Service', () => {
    let eventService: EventService;
    let model: Model<Event>;
    const mockEventService = {
        findById: jest.fn(),
        find: jest.fn(),
    };

    const mockEvent = {
        _id: "666b3bcae6da9b3c59959904",
        title: "Religious Event By Fausto 777",
        description: "This is a preview",
        eventType: "public",
        date: "2024/12/12",
        location: "Quito, Ecuador",
        author: "Fausto Zambrano",
        userId: "666b37244ea7d6800eb3e6e7",
        categoryList: [
            "VideoGames",
            "Action",
            "Betting"
        ],
        guestList: [
            "Fausto@asdas.com",
            "asdasd@asdas.com"
        ],
        uploads: [
            "asasdasdas.jpeg"
        ],
        createdAt: "2024-06-13T18:34:50.785Z",
        updatedAt: "2024-06-13T18:34:50.785Z",
        __v: 0
    }

    const mockEventList = [
        {
            _id: "1",
            title: "One",
        },
        {
            _id: "2",
            title: "Two",
        },
    ]


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventService,
                {
                    provide: getModelToken(Event.name),
                    useValue: mockEventService,

                }
            ],
        }).compile();

        eventService = module.get<EventService>(EventService);
        model = module.get<Model<Event>>(getModelToken(Event.name));
    });

    describe('get event by id', () => {

        it('Should return an event by Id', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(mockEvent);
            const result = await eventService.findEventById(mockEvent._id);
            expect(model.findById).toHaveBeenCalledWith(mockEvent._id);
            expect(result).toEqual(mockEvent);
        });

        it('Should return NOT FOUND error if id is wrong', async () => {
            jest.spyOn(model, 'findById').mockResolvedValue(null);
            await expect(eventService.findEventById(mockEvent._id)).rejects.toThrow(NotFoundException);
            expect(model.findById).toHaveBeenCalledWith(mockEvent._id);

        });

    });

    describe('get all events list', () => {

        it('Should retrieve a list of all events', async () => {
            jest.spyOn(model, 'find').mockResolvedValue(mockEventList);
            const result = await eventService.findAllEvents();
            expect(model.findById).toHaveBeenCalled();
            expect(result).toEqual(mockEventList);

        })
    })
});
