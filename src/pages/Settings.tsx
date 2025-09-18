import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Teacher {
  name: string;
  class: string;
}

export default function SettingsPage() {
  const [teacherName, setTeacherName] = useState('');
  const [className, setClassName] = useState('');
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  function addTeacher() {
    if (teacherName && className) {
      setTeachers([...teachers, { name: teacherName, class: className }]);
      setTeacherName('');
      setClassName('');
    }
  }

  return (
    <div className="bg-secondary-light min-h-screen py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          <p className="text-primary-light">Manage teachers and timetable data</p>
        </header>

        <Tabs defaultValue="teachers" className="space-y-6">
          <TabsList>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
          </TabsList>

          <TabsContent value="teachers">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Add Teacher</h2>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <Input
                    placeholder="Teacher Name"
                    value={teacherName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeacherName(e.target.value)}
                  />
                  <Input
                    placeholder="Class Name"
                    value={className}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClassName(e.target.value)}
                  />
                  <Button onClick={addTeacher} className="bg-primary text-white">Add</Button>
                </div>

                <h3 className="text-lg font-medium mb-2">Teacher List</h3>
                <ul className="list-disc list-inside">
                  {teachers.map((t, idx) => (
                    <li key={idx}>{t.name} - {t.class}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timetable">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Timetable Management</h2>
                <p className="text-gray-500">Placeholder for uploading and managing timetable data.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
