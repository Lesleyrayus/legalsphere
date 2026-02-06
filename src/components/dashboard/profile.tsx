"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { User, Lock, CreditCard, Bell, LogOut, Briefcase, Mail, Phone, MapPin, FileText, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProfileData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  address: string;
};

const profileNavItems = [
    { name: "Personal Information", icon: User },
    { name: "Login & Security", icon: Lock },
    { name: "Billing & Plans", icon: CreditCard },
    { name: "Notifications", icon: Bell },
];

const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: React.ReactNode }) => (
    <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <div className="font-medium">{value}</div>
        </div>
    </div>
);

export function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState<ProfileData>({
    name: "John Doe",
    title: "Senior Partner",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    bio: "John Doe is a seasoned lawyer with over 15 years of experience in corporate law. He is a founding partner at J. Doe & Associates and is known for his sharp legal acumen and dedication to his clients.",
    avatar: "https://picsum.photos/seed/lawyer/200/200",
    address: "120 Broadway, New York, NY 10271",
  });

  const [formData, setFormData] = useState<ProfileData>(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, avatar: newImage });
    }
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully saved.",
    });
  };

  const handleCancel = () => {
    setFormData(profile); 
    setIsEditing(false);
  };
  
  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  }

  const currentData = isEditing ? formData : profile;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left column */}
        <div className="lg:col-span-1 space-y-8">
            <Card className="overflow-hidden text-center">
                <div className="bg-slate-900 dark:bg-slate-800 p-6 relative">
                    <Badge className="absolute top-4 right-4 bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">Verified</Badge>
                     <Avatar className="h-28 w-28 mx-auto border-4 border-background shadow-md">
                        <AvatarImage src={currentData.avatar} alt="User Avatar" data-ai-hint="person face" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                     {isEditing && (
                        <>
                            <Button 
                            size="icon" 
                            variant="outline"
                            className="absolute bottom-4 right-1/2 translate-x-[60px] rounded-full h-9 w-9 bg-background/80 backdrop-blur-sm"
                            onClick={() => fileInputRef.current?.click()}>
                            <Edit className="h-4 w-4"/>
                            <span className="sr-only">Change Photo</span>
                            </Button>
                            <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handlePhotoChange}
                            className="hidden"
                            accept="image/*"
                            />
                        </>
                    )}
                </div>
                <CardContent className="p-6 space-y-1">
                     <h2 className="text-2xl font-bold">{currentData.name}</h2>
                     <p className="text-muted-foreground">{currentData.email}</p>
                </CardContent>
                <Separator />
                 <div className="p-4 grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-xs text-muted-foreground">ACTIVE CASES</p>
                        <p className="text-lg font-bold">18</p>
                    </div>
                     <div>
                        <p className="text-xs text-muted-foreground">DOCUMENTS</p>
                        <p className="text-lg font-bold">123</p>
                    </div>
                </div>
            </Card>

            <Card>
                <CardContent className="p-2">
                    <nav className="flex flex-col gap-1">
                        {profileNavItems.map((item, index) => (
                             <Button
                                key={item.name}
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start gap-3",
                                    index === 0 && "bg-muted font-semibold"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Button>
                        ))}
                         <Separator className="my-1" />
                        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive">
                            <LogOut className="h-5 w-5" />
                            <span>Sign Out</span>
                        </Button>
                    </nav>
                </CardContent>
            </Card>
        </div>

        {/* Right column */}
        <div className="lg:col-span-3">
             <Card>
                <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal and contact information.</CardDescription>
                    </div>
                     {!isEditing && (
                        <Button variant="outline" size="sm" onClick={handleEdit}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Legal Name</Label>
                                <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="title">Title / Occupation</Label>
                                <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Residential Address</Label>
                            <Input id="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Biography / Notes</Label>
                            <Textarea id="bio" placeholder="Tell us a little bit about yourself" className="min-h-[120px]" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})}/>
                        </div>
                    </form>
                  ) : (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <DetailItem icon={User} label="Full Legal Name" value={profile.name} />
                            <DetailItem icon={Briefcase} label="Title / Occupation" value={profile.title} />
                            <DetailItem icon={Mail} label="Email Address" value={profile.email} />
                            <DetailItem icon={Phone} label="Phone Number" value={profile.phone} />
                        </div>
                        <DetailItem icon={MapPin} label="Residential Address" value={profile.address} />
                         <DetailItem icon={FileText} label="Biography / Notes" value={
                             <p className="whitespace-pre-wrap leading-relaxed">{profile.bio}</p>
                         } />
                    </div>
                  )}
                </CardContent>
                {isEditing && (
                    <CardFooter className="justify-end gap-2 border-t pt-6">
                         <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                         <Button onClick={handleSave}>Save Changes</Button>
                    </CardFooter>
                )}
             </Card>
        </div>
    </div>
  );
}
