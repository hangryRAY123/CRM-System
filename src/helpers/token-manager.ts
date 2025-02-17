class TokenManager {
  private static instance: TokenManager;
  private accessToken: string | null = null;

  private constructor() {}

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  public setToken(token: string): void {
    this.accessToken = token;
  }

  public getToken(): string | null {
    return this.accessToken;
  }

  public clearToken(): void {
    this.accessToken = null;
  }

  public checkToken(): boolean {
    return this.accessToken !== null;
  }
}

export default TokenManager.getInstance();
