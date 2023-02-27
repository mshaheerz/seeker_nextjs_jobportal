import { deletePost, deleteReport, getAllReports } from "@/config/endpoints";
import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import swal from 'sweetalert'

function ReportComponent() {
  const [reports, setReports] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    (async function () {
      const data = await getAllReports({
        admintoken: localStorage.getItem("admintoken"),
      });
      setReports(data?.reports);
    })();
  }, [refresh]);
  return (
    
    <div>
        {
        reports.length==0 && (
            <div className="text-white text-3xl text-center mt-5 "> Currently no Reported posts </div>

        )
        }
      <div className="flex justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {reports &&
            reports.map((report: any) => (
              <div key={report._id} className="flex justify-between">
                <div className="flex flex-col md:flex-row md:max-w-xl rounded-lg bg-black shadow-lg border">
                  <img
                    className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                    src={`${report.post.image}`}
                    alt="null"
                  />
                  <div className="p-6 flex flex-col justify-start">
                    <h5 className="text-gray-300 text-xl font-medium mb-2">
                      Reports
                    </h5>
                    <h3 className="text-gray-300 text-6xl mb-4">{report?.reports?.length}</h3>
                    <p className="text-gray-300 text-xs cursor-pointer hover:text-red-700">
                      <Delete onClick={async (e:any)=>{
                        e.stopPropagation();
                        swal({
                            title: "Are you sure?",
                            text: "Delete the post",
                            icon: "warning",
                            buttons: ['cancel', 'Ok'],
                            dangerMode: true,
                          })
                          .then(async (willDelete:any) => {
                            if (willDelete) {
                            await deleteReport(report?.post?._id)
                            const data = await deletePost(report?.post?._id)
                            if(data?.status ==='success'){
                            setRefresh(!refresh)
                            }
                            } 
                          });
                     
                      }} />
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ReportComponent;
