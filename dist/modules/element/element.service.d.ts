import { Element } from './schemas/element.schema';
import { UpdateElementDTO } from './dtos/updateElement.dto';
export declare class ElementService {
    private elementModel;
    findAllElements(): Promise<Element[]>;
    findAllElementsByQuery(query: any): Promise<Element[]>;
    findAllAvailableElementsByUserEmail(userEmail: string): Promise<Element[]>;
    findAllAvailableElementsByUserId(id: string): Promise<Element[]>;
    createElement(element: UpdateElementDTO): Promise<Element>;
    createElementFromPrepagos(page: string): Promise<any>;
    createElementFromPlusvalia(page: string): Promise<any>;
    findElementById(id: string): Promise<Element>;
    findElementBySlug(slug: string): Promise<Element>;
    updateElementById(id: string, element: any): Promise<Element>;
    deleteElementById(id: string): Promise<Element>;
    scrapePrepagos(driver: any, page: any): Promise<{
        userId: string;
        title: string;
        description: any;
        authorName: any;
        authorNationality: string;
        authorPhone: string;
        authorEmail: string;
        location: any;
        address: any;
        city: any;
        country: string;
        plan: string;
        status: string;
        category: string;
        schedule: string[];
        images: any[];
    }>;
    scrapePlusvalia(driver: any, page: any): Promise<{
        title: any;
        operacion: any;
        description: any;
        image: any;
    }>;
    fetchImageFromUrl(url: string): Promise<Buffer>;
}
