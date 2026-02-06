"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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

  const handleChangePhotoClick = () => {
    fileInputRef.current?.click();
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
    // Reset form data to the last saved profile state
    setFormData(profile); 
    setIsEditing(false);
  };
  
  const handleEdit = () => {
    // Initialize form with current profile data
    setFormData(profile);
    setIsEditing(true);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>
            {isEditing ? "Update your personal information and preferences." : "View your personal information and preferences."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={isEditing ? formData.avatar : profile.avatar} alt="User Avatar" data-ai-hint="person face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{isEditing ? formData.name : profile.name}</h3>
            <p className="text-muted-foreground">{isEditing ? formData.title : profile.title}</p>
            {isEditing && (
              <>
                <Button variant="outline" size="sm" onClick={handleChangePhotoClick}>Change Photo</Button>
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
        </div>

        {isEditing ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}/>
              </div>
              <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
              </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea id="bio" placeholder="Tell us a little bit about yourself" className="min-h-[100px]" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})}/>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <Label>Full Name</Label>
                  <p className="text-sm font-medium">{profile.name}</p>
              </div>
              <div className="space-y-2">
                  <Label>Email</Label>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
              </div>
              <div className="space-y-2">
                  <Label>Title</Label>
                  <p className="text-sm font-medium">{profile.title}</p>
              </div>
              <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <p className="text-sm text-muted-foreground">{profile.phone}</p>
              </div>
            </div>
            <div className="space-y-2">
                <Label>Biography</Label>
                <p className="text-sm text-muted-foreground min-h-[100px] whitespace-pre-wrap">{profile.bio}</p>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter>
        {isEditing ? (
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save Changes</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
        ) : (
          <Button onClick={handleEdit}>Edit Profile</Button>
        )}
      </CardFooter>
    </Card>
  );
}
