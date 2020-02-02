# 설치
- npm i @stomp/rx-stomp

# 테스트 페이지 추가
- ng g m stompui --routing
- ng g c stompui/stompui-about
- stompui-routing.module.ts > { path: '',component: StompuiAboutComponent }
- app-routing.module.ts > {path: 'stompui',loadChildren: () => import('./stompui/stompui.module').then(m => m.StompuiModule)}
- header.component.html > [route]="['stompui']"

# 레이아웃 디자인 (grapesjs) - https://grapesjs.com/demo.html 
- sqlview꺼 사용

# carbon 넣기
- stompui-module.ts : imports 추가 
  - carbon : InputModule, ButtonModule, TagModule, TableModule,SearchModule,GridModule
  - ng : FormsModule,ReactiFormsModule,HttpClientModule
  - 기타 : ngxjsonviewermodule


# test data
```
```

