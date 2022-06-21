import { registerService, loginService, welcomeService } from "../services/user";

export async function register (req, res) {
    return await registerService(req,res);
  }

  export async function login  (req, res){
    return await loginService(req,res);
  }

  export async function welcome (req, res) {
    return await welcomeService(req,res);
  }
  