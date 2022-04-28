import React, {useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Collapse, Spin} from "antd";
import {PhoneOutlined} from "@ant-design/icons";

const {Panel} = Collapse;

type serviceTicket = {
  id: string,
  basic_account: string,
  phone_number: string,
  priority: string,
  assigned_at: string,
  text: string,
  address: string,
  sector_id: string,
  sector_title: string,
  extra_sector_id: string,
  extra_sector_title: string,
  tariff_name: string,
  full_name: string,
  login: string,
  password: string,
  service_engineer: string
};

type newTicket = {
  assigned_time: string,
  nojoin_demand_text: string,
  phone_numbers: string,
  address: string,
  text: string
}

type ticketsResponse = {
  new: newTicket[],
  old: serviceTicket[]
}

type accordionData = {
  time: Date,
  text: string,
  phone: string,
  address: string
}

export const Tickets: React.FC = () => {

  const {request} = useHttp();
  const [tasks, setTasks] = useState<accordionData[]>([{time: new Date(), text: '', phone: '', address: ''}]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    setLoading(true);
    request.get<{ tickets: ticketsResponse }>('/api/tickets').then(({data}) => {
      const {old, new: leads} = data.tickets;
      const notSortedTickets: accordionData[] = [
        ...old.map(ticket => (
          {
            time: new Date(ticket.assigned_at),
            text: ticket.text,
            phone: ticket.phone_number,
            address: ticket.address
          }
        )),
        ...leads.map(ticket => (
          {
            time: new Date(ticket.assigned_time),
            text: ticket.text,
            phone: ticket.phone_numbers,
            address: ticket.address
          }
        ))
      ];

      setTasks(notSortedTickets.sort(({time: aTime}, {time: bTime}) => {
        if (aTime.getTime() < bTime.getTime()) {
          return -1;
        }
        if (aTime.getTime() > bTime.getTime()) {
          return 1;
        }
        return 0;
      }))


    })
      .finally(() => setLoading(false));
  }, [])

  return (
    <div>
      <Spin spinning={loading}>
        <Collapse>
          {tasks?.map((task, i) => (
            <Panel
              key={i}
              header={`${task.address} ${task.time.toLocaleTimeString('ru', {hour: "numeric", minute: "numeric"})}`}
              extra={<a href={`tel:${task.phone}`}><PhoneOutlined style={{fontSize: '20px'}}/></a>}
            >
              {task.text}
            </Panel>
          ))}
        </Collapse>
      </Spin>
    </div>
  );
}