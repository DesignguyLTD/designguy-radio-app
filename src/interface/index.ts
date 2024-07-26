export interface playerInterface {
    _id: string;
    _score: number;
    _source: {
      code: string;
      subtitle: string;
      type: string;
      title: string;
      stream: string;
      url: string;
    };
  }

  export interface CreateUser {
      email: string;
      password: string;
  }