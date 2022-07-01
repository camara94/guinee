import { Technologie } from './technologie';
import { Contact } from './contact';
import { Service } from './service';
import { Ideation } from './ideation';
import { Principe } from './principes';


export interface Stardevcgroup {
    logos: string[]
    images: string[];
    slogans: string[];
    nom: string;
    description: string;
    apropos: string;
    technologies: Technologie[];
    contact: Contact;
    services: Service[];
    location: string;
    ideations: Ideation[];
    principes: Principe[]
}