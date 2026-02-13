import { DocumentStep } from "@/utils/Types/Global";

export const documentSteps: DocumentStep[] = [
    {
        id: 'bi',
        stepNumber: 1,
        image: require('../assets/images/BI_option.png'),
        title: 'Dados do solicitante',
        route: '/HomeScreens/(Credit)/ClientForm' as const,
        description: 'Preencha os dados identificação do solicitante'
    },
    {
        id: 'contribuinte',
        stepNumber: 2,
        image: require('../assets/images/Initial_options.png'),
        title: 'Dados do crédito',
        route: '/HomeScreens/(Credit)/CreditForm' as const,
        description: 'Preencha os dados do crédito'
    },
    {
        id: 'empresa',
        stepNumber: 3,
        image: require('../assets/images/Company_options.png'),
        title: 'Dados Sociais',
        route: '/HomeScreens/(Credit)/SocialForm' as const,
        description: 'Preencha os dados sociais do solicitante'
    },
    {
        id: 'trabalho',
        stepNumber: 4,
        image: require('../assets/images/work_options.png'),
        title: 'Dados do negócio',
        route: '/HomeScreens/(Credit)/BusinessForm' as const,
        description: 'Preencha os dados do negócio'
    }
]