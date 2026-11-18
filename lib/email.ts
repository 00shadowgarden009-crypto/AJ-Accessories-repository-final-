export async function sendTransactionalEmail(_to: string, _subject: string, _html: string) {
  throw new Error('Email provider is not configured');
}
