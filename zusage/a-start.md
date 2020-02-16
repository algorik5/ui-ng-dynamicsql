
# carbon-angular-starter
- ng new ui-ng-dynamicsql --routing --style=scss
- cd ui-ng-dynamicsql
- npm install
- npm install --save carbon-components-angular carbon-components @carbon/icons-angular
- src/style.scss <<< @import "~carbon-components/scss/globals/scss/styles.scss";
- src/assets/* 전체복사
- src/app 전체복사/덮어쓰기
- (***) packages.json : core-js(3.2.1)
- ng serve

# 테스트 페이지 추가
- ng g m zhello --routing
- ng g c zhello/zhello-about --skipTests=true
- zhello-routing.module.ts > { path: '',component: ZhelloAboutComponent }
- app-routing.module.ts > {path: 'zhello',loadChildren: () => import('./zhello/zhello.module').then(m => m.ZhelloModule)}
- header.component.html > [route]="['zhello']"

# 페이지 만들기
- ng g m xxx --routing
- ng g c xxx/about
- xxx-routing.module.ts > { path: '',component: AboutComponent }
- app-routing.module.ts > {path: 'sqlview',loadChildren: () => import('./xxx/xxx.module').then(m => m.XxxModule)}
- header.component.html > [route]="['xxx']"
- module.ts
  - TagModule, CodeSnippetModule, TabsModule, InputModule, SearchModule, ButtonModule, TableModule, GridModule, StructuredListModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    NgxJsonViewerModule, HotTableModule, TreeTableModule, NgScrollbarModule, NgxEchartsModule,






# (참고) 레이아웃 디자인 (grapesjs) - https://grapesjs.com/demo.html 
- (주의) decorations/border with를 1로 설정
- (주의) text를 넣어서 위치에 이름 표시(input table ...)
- css 복사 > sqlview-about.component.scss
- html 복사 > sqlview-about.component.html


