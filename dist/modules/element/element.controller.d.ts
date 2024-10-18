import { ElementService } from './element.service';
import { CreateElementDTO } from './dtos/createElement.dto';
import { UpdateElementDTO } from './dtos/updateElement.dto';
export declare class ElementController {
    private elementService;
    constructor(elementService: ElementService);
    getAllElements(): Promise<any[]>;
    getAllElementsByUserId(userEmail: string): Promise<any[]>;
    createElement(element: CreateElementDTO): Promise<any>;
    getElementBySlug(slug: string): Promise<any>;
    getElement(id: string): Promise<any>;
    updateElement(id: string, element: UpdateElementDTO): Promise<any>;
    deleteElement(id: string): Promise<any>;
}
