function CompanyInfos({ company }: any) {
  return (
    <div className="text-gray-400 mt-4">
      <div className="border border-r border-gray-700">
        <h3 className="text-white ml-3 mt-2 font-semibold">
          Profile Information
        </h3>
        <div className=" text-gray-200 ml-3 text-sm">
          Description:
          <p className="text-gray-500">{company?.description}</p>
        </div>
        <div className="grid grid-cols-2 ml-3 mt-2 mb-3 font-normal">
          <div className="mt-3">Ceo: {company?.fullname}</div>
          <div className="mt-3">Email: {company?.email}</div>
          <div className="mt-3">industry: {company?.industry}</div>
          <div className="mt-3">Employee counts: {company?.employeeCount}</div>
          <div className="mt-3">{/* Education: {users?.school} */}</div>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfos;
