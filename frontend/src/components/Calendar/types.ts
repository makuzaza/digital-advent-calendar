export interface CalendarData {
    image: {
        imageUrl: string;
        uploadedImageName: string;
    };
    sounds: {
        musicName: string;
        soundFxName: string;
    };
    text: {
        title: string;
        titleFont: string;
        titleFontSize: number;
        titleColor: string;
        subtitle: string;
        subtitleFont: string;
        subTitleFontSize: number;
        subtitleColor: string;
    };
    windows: string[];
    windowsContent: Array<{
        text: string;
        videoURL: string;
    }>;
}

