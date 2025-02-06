import { useEffect } from 'react';
import './App.css';
import { Button } from '@/components/ui/button';
import { get } from './request';

function App() {
  useEffect(() => {
    // 发送 GET 请求
    get('/user', { id: 1 }).then((res) => {
      console.log('User Info:', res);
    });
  }, []);
  return (
    <>
      <div>
        <Button variant={'default'}>Click me</Button>
      </div>
    </>
  );
}

export default App;
