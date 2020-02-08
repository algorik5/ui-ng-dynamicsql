
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
- ng g c zhello/zhello-about
- zhello-routing.module.ts > { path: '',component: ZhelloAboutComponent }
- app-routing.module.ts > {path: 'zhello',loadChildren: () => import('./zhello/zhello.module').then(m => m.ZhelloModule)}
- header.component.html > [route]="['zhello']"

# etc
