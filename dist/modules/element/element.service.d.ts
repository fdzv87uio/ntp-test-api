import { Element } from './schemas/element.schema';
import { UpdateElementDTO } from './dtos/updateElement.dto';
export declare class ElementService {
    private elementModel;
    findAllElements(): Promise<Element[]>;
    findAllAvailableElementsByUserEmail(userEmail: string): Promise<Element[]>;
    createElement(element: UpdateElementDTO): Promise<Element>;
    findElementById(id: string): Promise<Element>;
    findElementBySlug(slug: string): Promise<Element>;
    updateElementById(id: string, element: any): Promise<Element>;
    deleteElementById(id: string): Promise<Element>;
}
