
export function convertStoM(seconds: number): string{
    const totalMinutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalHours % 60;
    return `${totalHours}h:${remainingMinutes}m:${remainingSeconds}s`
}