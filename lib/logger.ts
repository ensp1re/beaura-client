import { ErrorInfo } from "react";

class Logger {
    private static getTimestamp(): string {
        return new Date().toISOString();
    }

    private static colorize(level: string, message: string): string {
        const colors: { [key: string]: string } = {
            INFO: '\x1b[32m', // Green
            ERROR: '\x1b[31m', // Red
            WARN: '\x1b[33m', // Yellow
            RESET: '\x1b[0m' // Reset
        };
        return `${colors[level]}${message}${colors.RESET}`;
    }

    static info(message: string, source: string): void {
        console.log(this.colorize('INFO', `[${this.getTimestamp()}] [INFO] [${source}] ${message}`));
    }

    static error(message: string, source: string, error: Error | null = null, errorInfo: ErrorInfo | null = null): void {
        let errorMessage = `[${this.getTimestamp()}] [ERROR] [${source}] ${message}`;
        if (error) {
            errorMessage += `\nError: ${error.message}`;
        }
        if (errorInfo) {
            errorMessage += `\nError Info: ${JSON.stringify(errorInfo)}`;
        }
        console.error(this.colorize('ERROR', errorMessage));
    }

    static warn(message: string, source: string): void {
        console.warn(this.colorize('WARN', `[${this.getTimestamp()}] [WARN] [${source}] ${message}`));
    }
}

export default Logger;