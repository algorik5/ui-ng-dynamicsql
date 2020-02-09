export class SleepUtil
{
  //1. sleep : 호출하는 함수는 async로 선언
  //2. 호출시 await 사용해야 함
  private static async testSleep()
  {
     await SleepUtil.sleep(1000);//1000
  }
  private static async testSleep2()
  {
    //아래와 동일 >>>  
    await SleepUtil.sleep(1000).then(() => alert('222') );
    setTimeout(()=> alert('111'),1000);
    setTimeout(() => {
      alert('333'); 
      setTimeout(() => alert('33333333333') );
    });
  }

  //SleepUtil.sleepReal is not a function
  // static async sleepReal(ms:number)
  // {
  //    await SleepUtil.sleep(ms);//1000
  // }
  static sleep(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  private static async testSleep3()
  {
     await new Promise(resolve => setTimeout(resolve, 1000));//1000
  }
}
