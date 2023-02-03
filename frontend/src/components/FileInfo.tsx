import { Preview } from "./Preview";

const src =
  "https://lh3.googleusercontent.com/dp_RfslEQF48_AekJ0QfhsP_rlTb4ZlaWNKJfH9ghvDh7E13Q97U4h5dDA2259QEy7fWPrRp19nWai41MEzh4hef9s7L3G05EWojLBQdrfMGNA5HJaz_YjDtQZ4m8oH0yMqwyOJNwtVqBueJwFGg8FLy-Buf-uOdxnRupJRwLEnP5jS1R_1dzOokkSPNrD7xh0xujZ7oVnRZRTAHOlWbkPGZ7_D0kMM9Co5EjN5Z-RAr2TEGCdGATNQbwGtan-rUj9btScHwHCXdyKtjKUFhGKQN2NYgFE_IWuBCc93lA739uql8OpCJQwZcC2O_FRkLvP5ksXAMS9Gli54x9iSZXUELJNyk9gf3R0H2JcMadidVqXp59MIzjfMSEb73B4iOcFB5fkqjA7GV3kpiXC3OCuezolJu_VlktE7EPiKoCgtWx1khTRmiu-FILpc4FIdLZ2kbk0HwcOpw9sPu3gs0ThUNpzR4sEmw5NqOGoZ_HQPD0AGrvSPcUTl4RQuassF6qYSdt6eWP2gq0r0bLmFORm7SEBsKlSoXNy-BcxAhONOpBeGX6KEuikBF4l_ManWsyTAIXKXg8zF_PrNR2VtnPhnHjzXsJk2Rejyx8Jv-Yh7fwfB3C0zWSAcbJWy8xjSH-BvTALk2jWP5uxMOPgiOPYKytvEgPTluJeZdch2CLxLOHfWYbUR3hYi0RQCejQEXB0NZpnNaOF1IJTIdnnptIHmc9Jy0mgFJkTS2SPVQWUlIRdqCLGp-d2YN7HZp2ebWdPr5gHoQ13OQlA7-B10qKrIsaqj0ch2V8pnDkLyNGTiwfJqKnR5sYC2TycqLeqLq6ONRHjWOXWUiYApCKae_Icp3dkRJjeXkE7eVBVvpdnHee5vux8bai-LqSaXZdn_tobRtAB-Znj3EK5H0GSZLNjcAgcb0miXVaKbMUP6aydxXY3R65LGt3NpNFFkFObd1Us07RnepOrIJqKIKfQ=w426-h757-no?authuser=0";

export function FileInfo() {
  return (
    <div className="flex items-center">
      <Preview src={src} />
      <div className="flex flex-col ml-4">
        <strong>profile.png</strong>
        <span className="text-sm text-zinc-400">
          64kb
          <button className="border-0 bg-transparent text-red-600 ml-2 cursor-pointer">
            Excluir
          </button>
        </span>
      </div>
    </div>
  );
}
