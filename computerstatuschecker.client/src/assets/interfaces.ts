/* eslint-disable @typescript-eslint/no-unused-vars */
interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

interface Computer {
    name: string;
    status: string;
    apps: string;
}

interface ErrorPost {
    name: string;
    errorMessage: string;
    severity: string;
    ID: string;
}