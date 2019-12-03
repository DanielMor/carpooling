import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Group from 'components/group';
import api from 'api';

export default function GroupPage() {
  let [isLoading, setIsLoading] = useState(true);
  let [group, setGroup] = useState({});
  let { key } = useParams();

  useEffect(() => {
    setIsLoading(true);
    api.groups.by(key).get()
      .then(data => {
        setIsLoading(false);
        setGroup(data);
      })
      .catch(() => {
        setIsLoading(false);
        setGroup({ error: true })
      });
  }, [key]);

  return (
    <div>
      {isLoading && <div>Loading</div>}
      {group.error && <div>Group not Found</div>}
      {group.key && <Group group={group} />}
    </div>
  )
}