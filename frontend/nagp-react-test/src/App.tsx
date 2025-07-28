import { useEffect, useState } from 'react';
import axios from 'axios';


interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
}


function App() {
  const [details, setDetails] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://bhaveshgoyal.duckdns.org/employees')
      .then(res => {
        setDetails(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>User Details</h1>
      {loading ? (
        <p>Loading...</p>
      ) : details.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
          border={1}
        >
          <thead>
            <tr>
              <th style={{ padding: '8px' }}>First Name</th>
              <th style={{ padding: '8px' }}>Last Name</th>
              <th style={{ padding: '8px' }}>Gender</th>
              <th style={{ padding: '8px' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '8px' }}>{item.first_name}</td>
                <td style={{ padding: '8px' }}>{item.last_name}</td>
                <td style={{ padding: '8px' }}>{item.gender}</td>
                <td style={{ padding: '8px' }}>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
