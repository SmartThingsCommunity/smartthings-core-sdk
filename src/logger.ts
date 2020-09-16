/**
 * A generic logger interface that is compatible with log4js. Using this keeps
 * dependencies on an external logger out when users don't want to include one.
 */
export interface Logger {
	level: string

	/* eslint-disable @typescript-eslint/no-explicit-any */
	trace(message: any, ...args: any[]): void
	debug(message: any, ...args: any[]): void
	info(message: any, ...args: any[]): void
	warn(message: any, ...args: any[]): void
	error(message: any, ...args: any[]): void
	fatal(message: any, ...args: any[]): void
	/* eslint-enable */

	isTraceEnabled(): boolean
	isDebugEnabled(): boolean
	isInfoEnabled(): boolean
	isWarnEnabled(): boolean
	isErrorEnabled(): boolean
	isFatalEnabled(): boolean
}


/**
 * A simple implementation of the Logger interface that does not log anything.
 */
export class NoLogLogger implements Logger {
	public level = 'off'

	/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
	trace(message: any, ...args: any[]): void {
		// no-op
	}
	debug(message: any, ...args: any[]): void {
		// no-op
	}
	info(message: any, ...args: any[]): void {
		// no-op
	}
	warn(message: any, ...args: any[]): void {
		// no-op
	}
	error(message: any, ...args: any[]): void {
		// no-op
	}
	fatal(message: any, ...args: any[]): void {
		// no-op
	}
	/* eslint-enable */

	isTraceEnabled(): boolean {
		return false
	}
	isDebugEnabled(): boolean {
		return false
	}
	isInfoEnabled(): boolean {
		return false
	}
	isWarnEnabled(): boolean {
		return false
	}
	isErrorEnabled(): boolean {
		return false
	}
	isFatalEnabled(): boolean {
		return false
	}
}

export const noLogLogger = new NoLogLogger()
