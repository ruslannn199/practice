import { CreateTask, Title } from '@/components';
import { PaginatedResponse, Task } from '@/server/types';
import { request } from '@/utils';
import { Divider, Flex } from 'antd';

export default async function Home() {
  const tasks = await request<PaginatedResponse<Task>>('tasks');

  console.log('tasks :>> ', tasks);
  return (
    <Flex vertical align='center' style={{ width: '100%' }}>
      <Title />
      <Divider />
      <Flex vertical style={{ width: 'calc(100vw - 64px)', padding: '32px' }} align='flex-start'>
        <CreateTask />
      </Flex>
    </Flex>
  );
}
