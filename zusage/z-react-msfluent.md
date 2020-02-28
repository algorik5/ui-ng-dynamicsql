# hello
- mkdir react-fluent-hello
  - cd react-fluent-hello
  - npm init uifabric
  - yarn start
- App.ts
  - import { Stack, IStackTokens,Text, Link, FontWeights,DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
```
     <Stack horizontal tokens={stackTokens}>
      <DefaultButton text="Standard" onClick={_alertClicked} allowDisabledFocus  />
      <PrimaryButton text="Primary" onClick={_alertClicked} allowDisabledFocus  />
    </Stack>
    ...
    function _alertClicked(): void {
      alert('Clicked');
    }
```

# ms fabric - 최강 <<<< 헐 - 이것때문에 react사용해야 하나 ? <<< 라이선스 이슈 있을 듯 >>>
- https://developer.microsoft.com/en-us/fabric#/get-started
- angular/react : ng 지원
  - https://github.com/microsoft/angular-react
  - fabric을 위한 ng <ng9지원은 ivy disable하여 지원예정>
	- 기타/무시 - https://github.com/qubiack/angular-reactjs




# 참고
- (최신 update ?)just-stack-uifabric > just-scripts
