"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Edit, Mail, Phone, MapPin, BadgeCheck, FileText, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ProfileData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  address: string;
  barId: string;
  practiceAreas: string[];
};

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
    barId: "JD1234567",
    practiceAreas: ["Corporate Law", "Mergers & Acquisitions", "Venture Capital", "Litigation"],
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
    <div className="space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
             <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                    <AvatarImage src={currentData.avatar} alt="User Avatar" data-ai-hint="person face" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                {isEditing && (
                    <>
                        <Button 
                        size="icon" 
                        variant="outline"
                        className="absolute bottom-1 right-1 rounded-full h-8 w-8 bg-background/80 backdrop-blur-sm"
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
            <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold">{currentData.name}</h1>
                <p className="text-lg text-muted-foreground">{currentData.title}</p>
            </div>
            <div className="flex gap-2">
                {!isEditing ? (
                    <Button onClick={handleEdit}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                    </Button>
                ) : (
                    <>
                        <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                        <Button onClick={handleSave}>Save Changes</Button>
                    </>
                )}
            </div>
        </div>
        
        {/* Profile Content */}
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Manage your public and professional details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                             <div className="space-y-2">
                                <Label htmlFor="address">Residential Address</Label>
                                <Input id="address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="barId">Bar ID</Label>
                                <Input id="barId" value={formData.barId} onChange={(e) => setFormData({...formData, barId: e.target.value})} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bio">Biography</Label>
                            <Textarea id="bio" placeholder="Tell us a little bit about yourself" className="min-h-[120px]" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})}/>
                        </div>
                         <div className="space-y-2">
                            <Label>Practice Areas</Label>
                            <Input placeholder="Corporate Law, Litigation..." value={formData.practiceAreas.join(', ')} onChange={(e) => setFormData({...formData, practiceAreas: e.target.value.split(',').map(s => s.trim())})} />
                            <p className="text-xs text-muted-foreground">Separate areas with a comma.</p>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-primary" /> About</h3>
                            <Separator className="my-2" />
                            <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2"><Mail className="h-5 w-5 text-primary" />Contact Information</h3>
                            <Separator className="my-2" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{profile.phone}</span>
                                </div>
                                 <div className="flex items-center gap-3 col-span-full">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span>{profile.address}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" />Professional Details</h3>
                             <Separator className="my-2" />
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-3">
                                    <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                                    <span>Bar ID: <span className="font-mono bg-muted px-2 py-1 rounded-md">{profile.barId}</span></span>
                                </div>
                                <div className="col-span-full">
                                    <p className="mb-2">Practice Areas:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {profile.practiceAreas.map(area => (
                                            <Badge key={area} variant="secondary">{area}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
