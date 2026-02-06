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
import { UploadCloud } from "lucide-react";

type ProfileData = {
  name: string;
  title: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
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
    avatar: "https://picsum.photos/seed/lawyer/200/200"
  });

  // This state will hold form data while editing
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

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/30 p-6">
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>
            {isEditing ? "Update your personal information below." : "View your personal information."}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-8">
        {/* Avatar and basic info */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-background shadow-md">
              <AvatarImage src={isEditing ? formData.avatar : profile.avatar} alt="User Avatar" data-ai-hint="person face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {isEditing && (
              <>
                <Button 
                  size="icon" 
                  className="absolute -bottom-2 -right-2 rounded-full h-9 w-9"
                  onClick={() => fileInputRef.current?.click()}>
                  <UploadCloud className="h-5 w-5"/>
                  <span className="sr-only">Upload Photo</span>
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
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{isEditing ? formData.name : profile.name}</h2>
            <p className="text-muted-foreground">{isEditing ? formData.title : profile.title}</p>
          </div>
        </div>

        <Separator />

        {/* Profile Details Form/View */}
        <div className="space-y-6">
            <h3 className="text-lg font-medium">Personal Information</h3>
            {isEditing ? (
              <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bio">Biography</Label>
                    <Textarea id="bio" placeholder="Tell us a little bit about yourself" className="min-h-[120px]" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})}/>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Full Name</span>
                      <span className="font-medium text-right">{profile.name}</span>
                  </div>
                   <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Title</span>
                      <span className="font-medium text-right">{profile.title}</span>
                  </div>
                   <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium text-right">{profile.email}</span>
                  </div>
                   <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Phone</span>
                      <span className="font-medium text-right">{profile.phone}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-muted-foreground">Biography</h4>
                  <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              </div>
            )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-6 flex justify-end">
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        ) : (
          <Button onClick={handleEdit}>Edit Profile</Button>
        )}
      </CardFooter>
    </Card>
  );
}
