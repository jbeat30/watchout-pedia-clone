## 🔥What is Memoization Hook?
- 컴포넌트의 최적화 작업!!
- 중복 계산을 피함으로써 성능을 향상시키는 목적 훅
- 메모제이션 훅은 메모리를 사용하여 계산 결과를 저장하고, 동일한 계산이 반복되면 저장된 값을 반환하며, 이로 인해
무분별한 사용은 메모리를 낭비하여 성능 저하를 일으킬 수 있음
---

## 대표적인 메모제이션의 종류
1. `useMemo` - 계산된 값을 재사용
2. `useCallback` - 함수 인스턴스를 재사용
3. `react.memo` - 컴포넌트를 재사용

---

## 🚀사용하는 이유
- 함수형 컴포넌트는 결국에는 함수이며, 렌더링마다 모든 변수와 함수를 새로 생성함.
- 이 과정에서 새로 생성된 변수와 함수는 새로운 메모리 주소에 할당되면서, 
컴포넌트의 성능에 부정적인 영향을 주기 때문에 메모제이션을 사용하여 성능을 최적화하기 위함


## useMemo
- `useMemo`는 계산된 값을 재사용하는 리액트 훅
- 렌더링 중에 특정 값이나 함수를 계산하고 싶을 때 사용
- **의존성 배열이 변경되지 않았다면, 이전에 계산된 값을 재사용**

### 예제 코드 - 확인 하고자 하는 점
1. **state 변화가 생긴다면 컴포넌트는 리렌더링되며, 메모제이션된 값은 다시 계산됨** 콘솔로그가 처음에 찍히는 것을 확인
2. 메모제이션을 사용 하지않았다면, 쉬운 계산을 할 때마다 어려운 계산도 함께 실행됨 - state가 변경될때 어떻게 콘솔로그가 찍히는 것을 확인
3. 어려운 계산을 메모제이션하여 쉬운 계산을 할 때마다 어려운 계산이 실행되지 않는가?
4. 쉬운 계산은 메모제이션을 사용하지 않았는데, 쉬운 계산을 할 때마다 콘솔로그가 찍히는 것을 확인
```tsx
const veryHardCalculation = (value:number):number => {
  console.log('어려운 계산');
  for (let i = 0; i < 1000000000; i++) {} // 시간이 오래 걸리는 계산, 단지 성능 측정을 위한 코드
  return value * value;
}
const veryEasyCalculation = (value:number):number => {
  console.log('쉬운계산');
  return value + value;
}
export default function ExampleUseMemo() {
  const [count, setCount] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);

  const hardValue = useMemo(() => {
    return veryHardCalculation(count); // useMemo를 사용하여 count의 제곱값을 계산
  }, [count]); // count가 변경될 때만 다시 계산
  
  // 메모제이션을 사용하지않는 다면 아래와 같이 어려운 계산이 쉬운 계산을 할 때마다 실행됨
  // const hardValue = veryHardCalculation(count);
  
  const easyValue = veryEasyCalculation(count2); // useMemo를 사용하여 count의 덧셈 값을 계산

  return (
      <>
        <div>
          <button onClick={() => setCount(count + 1)}>곱하기</button>
          <p>카운트: {count}</p>
          <p>제곱: {hardValue}</p>
        </div>
        <div>
          <button onClick={() => setCount2(count2 + 1)}>더하기</button>
          <p>카운트: {count2}</p>
          <p>덧셈: {easyValue}</p>
        </div>
      </>
  );
};
```