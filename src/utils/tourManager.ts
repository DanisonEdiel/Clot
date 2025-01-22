import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

let tour: Shepherd.Tour | null = null;

export const setupTour = () => {
    if (!tour) {
        tour = new Shepherd.Tour({
            defaultStepOptions: {
                cancelIcon: {
                    enabled: true
                },
                classes: 'bg-info text-primary rounded-xl shadow-lg p-4 border border-gray-200',
                scrollTo: { behavior: 'smooth', block: 'center' }
            },
            useModalOverlay: true
        });

        // Paso 2: SubscriptionCard
        tour.addStep({
            id: 'subscription-step',
            text: 'Aquí puedes ver los documentos acorde al plan que contrataste.',
            attachTo: {
                element: '#subscription-card',
                on: 'top'
            },
            buttons: [
                {
                    text: 'Siguiente',
                    action: tour?.next
                }
            ]
        });

        // Paso 3: UsersChart
        tour.addStep({
            id: 'users-chart-step',
            text: 'Aquí puedes ver e ingresar a la lista de RUC que tienes creados.',
            attachTo: {
                element: '#users-chart',
                on: 'left'
            },
            buttons: [
                {
                    text: 'Anterior',
                    action: tour?.back
                },
                {
                    text: 'Siguiente',
                    action: tour?.next
                }
            ]
        });

        //Paso 4: RevenueComprobants
        tour.addStep({
            id: 'revenue-step',
            text: 'Aquí se encuentran los comprobantes descargados recientes.',
            attachTo: {
                element: '#revenue-comprobants',
                on: 'top'
            },
            buttons: [
                {
                    text: 'Anterior',
                    action: tour.back
                },
                {
                    text: 'Siguiente',
                    action: tour.next
                }
            ]
        });

        // Paso 5: ProfileCard
        tour.addStep({
            id: 'profile-step',
            text: 'Si deseas un plan ilimitado para tus comprobantes puedes conseguirlos aquí.',
            attachTo: {
                element: '#profile-card',
                on: 'left'
            },
            buttons: [
                {
                    text: 'Anterior',
                    action: tour.back
                },
                {
                    text: 'Finalizar',
                    action: tour?.next
                }
            ]
        });
    }
};

export const startTour = async () => {
    if (!tour) {
        setupTour();
    }
    tour?.start();
};
