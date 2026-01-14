import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { PlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyShipments from './EmptyShipments';

const stats = [
  {
    label: 'Total Shipments',
    value: '1,284',
    change: '+12% from last month',
    color: 'text-green-600',
    icon: (
      <svg
        className="w-5 h-5 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 3v4M8 3v4M4 11h16"
        />
      </svg>
    ),
  },
  {
    label: 'In Transit',
    value: '432',
    change: '+5% vs yesterday',
    color: 'text-green-600',
    icon: (
      <svg
        className="w-5 h-5 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13l4-4 4 4m0 0l4-4 4 4"
        />
      </svg>
    ),
  },
  {
    label: 'Delivered',
    value: '750',
    change: '-2% from goal',
    color: 'text-red-500',
    icon: (
      <svg
        className="w-5 h-5 text-green-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    label: 'Pending',
    value: '102',
    change: '+48% new intake',
    color: 'text-green-600',
    icon: (
      <svg
        className="w-5 h-5 text-yellow-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4m0 4h.01"
        />
      </svg>
    ),
  },
];

const shipments = [
  {
    tracking: '#SHP-772810',
    recipient: 'Sarah Jenkins',
    recipientType: 'Corporate Office',
    destination: 'New York, US',
    status: 'Delivered',
    statusColor: 'success',
    date: 'Oct 24, 2023',
  },
  {
    tracking: '#SHP-772934',
    recipient: 'Michael Chen',
    recipientType: 'West Coast Hub',
    destination: 'San Francisco, US',
    status: 'In Transit',
    statusColor: 'info',
    date: 'Oct 25, 2023',
  },
  {
    tracking: '#SHP-772551',
    recipient: 'Elena Rodriguez',
    recipientType: 'Retail Partner',
    destination: 'Madrid, ES',
    status: 'Pending',
    statusColor: 'warning',
    date: 'Oct 26, 2023',
  },
  {
    tracking: '#SHP-772662',
    recipient: 'Thomas Müller',
    recipientType: 'Distribution Center',
    destination: 'Berlin, DE',
    status: 'Exception',
    statusColor: 'destructive',
    date: 'Oct 23, 2023',
  },
  {
    tracking: '#SHP-772991',
    recipient: 'David Park',
    recipientType: 'Direct Delivery',
    destination: 'Seoul, KR',
    status: 'In Transit',
    statusColor: 'info',
    date: 'Oct 26, 2023',
  },
];

const uploadHistory = [
  {
    name: 'Q4_Retail_Deliveries_v2.csv',
    processed: '2 hours ago',
    entries: 452,
    status: 'Success',
  },
  {
    name: 'International_Ground_Batch_88.csv',
    processed: '5 hours ago',
    entries: 120,
    status: 'Success',
  },
];

const Dashboard: React.FC = () => {
  const hasShipments = shipments.length > 0;
  return (
    <>
      {hasShipments ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="flex flex-col items-start justify-between"
              >
                <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
                  <div className="bg-muted p-2 rounded-lg">{stat.icon}</div>
                  <div>
                    <CardTitle className="text-base font-medium">
                      {stat.label}
                    </CardTitle>
                    <div className="text-2xl font-bold mt-1">{stat.value}</div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <span className={`text-xs font-medium ${stat.color}`}>
                    {stat.change}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Table and Side Cards */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Shipments Table */}
            <Card className="col-span-2">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <div className="flex items-center gap-2 w-full">
                  <Input
                    placeholder="Search by Tracking ID, Recipient or City..."
                    className="w-80"
                  />
                  <Button variant="outline" className="w-10">
                    All Statuses
                  </Button>
                  <Button variant="outline" className="w-10">
                    Service: Ground
                  </Button>
                  <Button variant="outline" className="w-10">
                    Filters
                  </Button>
                  <Link to="upload" className="ml-auto">
                    <Button className="max-h-9 w-40.25! text-sm font-bold cursor-pointer" variant="primary" type="button">
                      <PlusIcon className="size-5" />
                      Upload CSV
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Tracking Number
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Recipient
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Destination
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Ship Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {shipments.map((s, i) => (
                        <tr key={s.tracking} className="hover:bg-muted/50">
                          <td className="px-6 py-4 font-medium text-blue-700 cursor-pointer hover:underline">
                            {s.tracking}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium">{s.recipient}</div>
                            <div className="text-xs text-muted-foreground">
                              {s.recipientType}
                            </div>
                          </td>
                          <td className="px-6 py-4">{s.destination}</td>
                          <td className="px-6 py-4">
                            {s.status === 'Delivered' && (
                              <Badge variant="secondary">Delivered</Badge>
                            )}
                            {s.status === 'In Transit' && (
                              <Badge
                                variant="outline"
                                className="text-blue-600 border-blue-200 bg-blue-50"
                              >
                                In Transit
                              </Badge>
                            )}
                            {s.status === 'Pending' && (
                              <Badge
                                variant="outline"
                                className="text-yellow-700 border-yellow-200 bg-yellow-50"
                              >
                                Pending
                              </Badge>
                            )}
                            {s.status === 'Exception' && (
                              <Badge variant="destructive">Exception</Badge>
                            )}
                          </td>
                          <td className="px-6 py-4">{s.date}</td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              variant="outline"
                              className="w-10 p-2 rounded-md"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="19" cy="12" r="1" />
                                <circle cx="5" cy="12" r="1" />
                              </svg>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex items-center justify-between px-6 py-3 text-xs text-muted-foreground bg-muted/50 border-t">
                    <span>Showing 1 to 5 of 1,284 shipments</span>
                    <div className="flex gap-1">
                      <Button variant="outline" className="w-9">
                        Previous
                      </Button>
                      <Button variant="secondary" className="w-9">
                        1
                      </Button>
                      <Button variant="outline" className="w-9">
                        2
                      </Button>
                      <Button variant="outline" className="w-9">
                        3
                      </Button>
                      <span className="px-2">...</span>
                      <Button variant="outline" className="w-9">
                        257
                      </Button>
                      <Button variant="outline" className="w-9">
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Side Cards */}
            <div className="flex flex-col gap-8">
              {/* Upload History */}
              <Card>
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base font-medium">
                    Batch CSV Upload History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <ul className="space-y-2">
                    {uploadHistory.map((u) => (
                      <li
                        key={u.name}
                        className="flex items-center justify-between gap-2 bg-muted/50 rounded px-3 py-2"
                      >
                        <div>
                          <div className="font-medium text-sm">{u.name}</div>
                          <div className="text-xs text-muted-foreground">
                            Processed {u.processed} • {u.entries} entries
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-300">
                          {u.status}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Help Card */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-base font-medium text-blue-900">
                    Need help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-sm text-blue-900 mb-3">
                    View our documentation for formatting bulk CSV uploads or
                    contact support for API access.
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                    View Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <EmptyShipments />
      )}
    </>
  );
};

export default Dashboard;
