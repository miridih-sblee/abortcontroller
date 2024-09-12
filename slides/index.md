---
theme: "black"
transition: "fade"
customTheme: "./override"
highlightTheme: "atom-one-dark"
---

# `AbortController`

---


1. 소개 & 사용법
2. 활용 예시 {.fragment}
3. 주의사항 {.fragment}

---

하나 이상의 비동기 작업을 중단할 수 있게 해주는 JavaScript API

---

- `signal`: `AbortSignal` 객체
- `abort([reason])`: 메서드 {.fragment}

---

```ts
const controller = new AbortController();
const { signal } = controller;

const task = async (signal: AbortSignal) => {
  if (signal.aborted) { /* ... */ }
  signal.addEventListener('abort', () => { /* ... */ });
}

// 작업 중단
controller.abort();
```

---


- `signal.aborted`: `boolean` 값. 작업이 중단되었는지 여부
  
- `signal.reason`: 작업이 중단된 이유를 나타내는 값. 기본적으로 `"AbortError"` `DOMException`. `controller.abort(값)` 을 부르면 `reason = 값` {.fragment}
  
- `signal.throwIfAborted()`: 작업이 중단되었다면 `AbortError`를 `throw`. {.fragment}
  
- `signal.addEventListener()`: 중단 이벤트에 대한 리스너를 추가. {.fragment}
  
- `signal.removeEventListener()`: 중단 이벤트에 대한 리스너를 제거. {.fragment}


---

활용 예시

---

## 중복 중단 처리:

```ts
controller.abort(); // 첫번째 호출: 작업 중단
controller.abort(); // 두번째 호출: 효과 x
```

---

비동기 작업의 정리:

`abort()`를 호출해도 진행 중인 비동기 작업이 즉시 중단되지 않을 수 있음.

작업 내부에서 주기적으로 `signal.aborted`를 확인하거나, `abort` 이벤트를 처리해야함.

```ts
async function longTask(signal: AbortSignal) {
  while(someCondition && !signal.aborted) {
    await someAsyncOperation();
  }`
}
```

---

중첩된 `AbortController` 사용:

여러 `AbortController`를 조합하여 사용할 때는 주의.

부모 작업이 중단되면 자식 작업도 중단.

```ts
const parentController = new AbortController();
const childController = new AbortController();

// 부모 작업이 중단되면 자식 작업도 중단
parentController.signal.addEventListener('abort', () => {
  childController.abort();
});

performLongTask(childController.signal);

parentController.abort(); // 부모 작업 중단시 자식 작업도 중단
```
