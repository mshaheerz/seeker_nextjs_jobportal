function UserInfos({ users }: any) {
  console.log(users);
  return (
    <div className="text-gray-400 mt-4">
      <div className="border border-r border-gray-700">
        <h3 className="text-white ml-3 mt-2 font-semibold">
          Profile Information
        </h3>
        <div className="grid grid-cols-2 ml-3 mt-2 mb-3 font-normal">
          <div className="mt-3">City: {users?.city}</div>
          <div className="mt-3">State: {users?.state}</div>
          <div className="mt-3">Zip: {users?.zip}</div>
          <div className="mt-3">Recent Job: {users?.recentjob}</div>
          <div className="mt-3">Education: {users?.school}</div>
        </div>
      </div>
    </div>
  );
}

export default UserInfos;
