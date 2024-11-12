import { ElementService } from './element.service';
import { CreateElementDTO } from './dtos/createElement.dto';
import { UpdateElementDTO } from './dtos/updateElement.dto';
import { QueryDTO } from './dtos/query.dto';
import { ScrapePageDTO } from './dtos/scrapePage.dto';
export declare class ElementController {
    private elementService;
    constructor(elementService: ElementService);
    getAllElements(): Promise<any[]>;
    getAllElementsByUserEmail(userEmail: string): Promise<any[]>;
    getAllElementsByUserId(id: string): Promise<any[]>;
    createElement(element: CreateElementDTO): Promise<any>;
    createElementFromPrepagos(element: ScrapePageDTO): Promise<any>;
    createElementFromPlusvalia(element: ScrapePageDTO): Promise<any>;
    findElementsByQuery(query: QueryDTO): Promise<any>;
    getElementBySlug(slug: string): Promise<any>;
    getElement(id: string): Promise<any>;
    updateElement(id: string, element: UpdateElementDTO): Promise<any>;
    deleteElement(id: string): Promise<any>;
}
