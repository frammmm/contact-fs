import jwt from "jwt-simple";

export class JwtToken {
  public sub: JwtTokenSub;
  public iat: number;

  constructor(token: any) {
    this.sub = new JwtTokenSub(token.sub);
    this.iat = token.iat;
  }

  public static Generate(user: any) {
    return jwt.encode({
      sub: new JwtTokenSub(user),
      iat: Date.now()
    }, process.env.SECRET_KEY || "");
  }
}

class JwtTokenSub {
  public id: string;
  public email: string;
  public role_id: number;

  constructor(json: any) {
    this.id = json.id;
    this.email = json.email;
    this.role_id = json.role_id;
  }
}
